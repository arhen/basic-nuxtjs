export default function useDateFormate(x: string) {
  let dates = new Date(x)
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
  return dates.getDate() + ' ' + monthNames[dates.getMonth()] + ' ' + dates.getFullYear();
}