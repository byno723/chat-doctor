export const getChatTime = date => {
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
};

export const setDateChat = OldDate => {
  const year = OldDate.getFullYear();
  const mounth = OldDate.getMonth() + 1;
  const date = OldDate.getDate();

  return `${year}-${mounth}-${date}`;
};
