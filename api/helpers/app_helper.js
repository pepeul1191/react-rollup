
export const randomStringNumber = (length = 10) => {
  let resp = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < longitud; i++) {
    resp += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return resp;
}
