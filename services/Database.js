const mockUsers = {};
const mockBalances = {};
const mockTransactions = {};

export const initDatabase = async () => {
  console.log('🚀 Mock DB gotowa');
  return true;
};

export const registerUser = async (email, password) => {
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (Object.values(mockUsers).find(u => u.email === email)) {
    throw new Error('User exists');
  }
  
  const userId = Date.now().toString(); 
  mockUsers[email] = { id: userId, email, password };
  
  
  mockBalances[userId] = { PLN: 1000 }; 
  mockTransactions[userId] = [];
  
  console.log(`✅ Zarejestrowano user: ${userId}`);
  return userId;
};

export const loginUser = async (email, password) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const user = mockUsers[email];
  if (user && user.password === password) {
    return user;
  }
  return null;
};

export const getUserBalances = async (userId) => {
  if (!mockBalances[userId]) return { PLN: 0 };
  return mockBalances[userId];
};

export const getTransactions = async (userId) => {
  return mockTransactions[userId] || [];
};

export const zasilKonto = async (userId) => {
  if (!mockBalances[userId]) mockBalances[userId] = { PLN: 0 };
  
  mockBalances[userId].PLN = (mockBalances[userId].PLN || 0) + 100;
  return mockBalances[userId].PLN;
};


export const addTransaction = async (userId, fromCurrency, toCurrency, amountPLN, rate) => {
  if (!mockBalances[userId]) throw new Error('User not found');

  const currentPLN = mockBalances[userId].PLN || 0;

  if (currentPLN < amountPLN) {
    throw new Error('Brak wystarczających środków PLN');
  }

  
  const receivedCurrency = amountPLN / rate;

 
  mockBalances[userId].PLN -= amountPLN;

  
  mockBalances[userId][toCurrency] = (mockBalances[userId][toCurrency] || 0) + receivedCurrency;

  
  const tx = {
    id: Date.now(),
    date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
    amountPLN: amountPLN,
    received: receivedCurrency,
    fromCurrency: fromCurrency,
    toCurrency: toCurrency,
    rate: rate
  };

  if (!mockTransactions[userId]) mockTransactions[userId] = [];
  mockTransactions[userId].unshift(tx);

  return true;
};