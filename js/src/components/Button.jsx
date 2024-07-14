export default function Button({
  children,
  bgColor = 'orange',
  type = 'button',
  size = 'md',
  handleClick,
  otherOpts,
  disabled = false,
}) {
  // children.isRequired
  // color: 'orange' | 'black' | 'red'
  // type: 'button' | 'submit' | 'reset'
  const color = {
    orange: 'bg-orange-500',
    black: 'bg-gray-900',
    red: 'bg-red-500',
  };
  const btnSize = {
    sm: 'px-2 text-sm',
    md: 'px-4 text-base',
  };

  return (
    <button
      type={type}
      className={`${color[bgColor]} ${btnSize[size]} py-1 text-white font-semibold ml-2 hover:bg-amber-400 rounded ${otherOpts}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
