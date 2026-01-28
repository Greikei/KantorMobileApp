const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  const { login, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { login } });
    if (existingUser)
      return res.status(400).json({ error: "Użytkownik istnieje" });

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({ data: { login, password } });
      await tx.balance.create({
        data: { userId: user.id, currency: "PLN", amount: 1000.0 },
      });
      return user;
    });

    console.log(`✅ Zarejestrowano: ${login}`);
    res.json({ id: result.id, login: result.login });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/login", async (req, res) => {
  const { login, password } = req.body;
  const user = await prisma.user.findUnique({ where: { login } });
  if (!user || user.password !== password)
    return res.status(401).json({ error: "Błędne dane" });
  res.json({ id: user.id, login: user.login });
});

app.get("/balance/:userId", async (req, res) => {
  const { userId } = req.params;
  const balances = await prisma.balance.findMany({ where: { userId } });

  const balanceMap = {};
  balances.forEach((b) => (balanceMap[b.currency] = b.amount));
  if (!balanceMap["PLN"]) balanceMap["PLN"] = 0;

  res.json(balanceMap);
});

app.get("/transactions/:userId", async (req, res) => {
  const { userId } = req.params;
  const history = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });

  const formatted = history.map((tx) => ({
    ...tx,
    date: new Date(tx.date).toLocaleString(),
  }));
  res.json(formatted);
});

app.post("/transaction", async (req, res) => {
  const { userId, type, currency, amountInput, rate } = req.body;

  console.log(
    `🔄 Transakcja: User ${userId}, Typ ${type}, Waluta ${currency}, Kwota ${amountInput}`,
  );

  try {
    await prisma.$transaction(async (tx) => {
      let plnRecord = await tx.balance.findUnique({
        where: { userId_currency: { userId, currency: "PLN" } },
      });
      const currentPLN = plnRecord ? plnRecord.amount : 0;

      let foreignRecord = await tx.balance.findUnique({
        where: { userId_currency: { userId, currency: currency } },
      });
      const currentForeign = foreignRecord ? foreignRecord.amount : 0;

      let amountPLN = 0;
      let amountForeign = 0;
      const amountVal = parseFloat(amountInput);

      if (type === "BUY") {
        amountPLN = amountVal;
        amountForeign = amountVal / rate;

        if (currentPLN < amountPLN) throw new Error("Brak środków PLN");

        await tx.balance.update({
          where: { userId_currency: { userId, currency: "PLN" } },
          data: { amount: { decrement: amountPLN } },
        });
        await tx.balance.upsert({
          where: { userId_currency: { userId, currency } },
          update: { amount: { increment: amountForeign } },
          create: { userId, currency, amount: amountForeign },
        });
      } else if (type === "SELL") {
        amountForeign = amountVal;
        amountPLN = amountVal * rate;

        if (currentForeign < amountForeign)
          throw new Error(`Brak środków ${currency}`);

        await tx.balance.update({
          where: { userId_currency: { userId, currency } },
          data: { amount: { decrement: amountForeign } },
        });
        await tx.balance.upsert({
          where: { userId_currency: { userId, currency: "PLN" } },
          update: { amount: { increment: amountPLN } },
          create: { userId, currency: "PLN", amount: amountPLN },
        });
      }

      await tx.transaction.create({
        data: { userId, type, currency, amountPLN, amountForeign, rate },
      });
    });

    res.json({ success: true });
  } catch (error) {
    console.error("❌ Błąd:", error.message);
    res.status(400).json({ error: error.message });
  }
});

app.post("/topup", async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      return res
        .status(404)
        .json({ error: "Użytkownik nie istnieje. Zaloguj się ponownie." });

    await prisma.balance.upsert({
      where: { userId_currency: { userId, currency: "PLN" } },
      update: { amount: { increment: 100 } },
      create: { userId, currency: "PLN", amount: 100 },
    });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
