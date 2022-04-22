import classNames from "classnames";

export default function Avatar({ creator, index }) {
  // https://stackoverflow.com/a/69191922/3438834
  function getBackgroundColor(stringInput) {
    const h = [...stringInput].reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    const s = 95,
      l = 35 / 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  return (
    <div
      style={{ borderColor: getBackgroundColor(creator) }}
      className={classNames(
        "h-8 w-8 rounded-full border-2 font-semibold flex-col shadow-lg flex items-center justify-center p-8 text-xs"
      )}
    >
      <span>{creator.substring(0, 4)}</span>
      <span>{creator.slice(-4)}</span>
    </div>
  );
}
