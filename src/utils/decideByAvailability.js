export default function decideByAvailability(options) {
  if (options === 0) {
    return "none";
  } else if (options <= 5) {
    return "few";
  } else {
    return "";
  }
}
 