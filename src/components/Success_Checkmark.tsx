export default function Success_Checkmark({ style, className = "", size = 20 }: { style?: React.CSSProperties, className?: string, size?: number }) {
  return (
    <div className={className}>
      <div 
        className="relative"
        style={{
          width: size,
          height: size
        }}
      >
        <div
          className="
            absolute
            inset-0
            rounded-full
            border-4
            border-green-500
            animate-ping
          "
          style={style}
        />
        <div
          className="
            absolute
            inset-0
            rounded-full
            border-2
            border-green-500
          "
        />
        <svg
          className="absolute inset-0 w-full h-full text-green-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            className="stroke-dasharray-48 stroke-dashoffset-48 animate-checkmark"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <style>{`
        @keyframes checkmark {
          to {
            stroke-dashoffset: 0;
          }
        }

        .animate-checkmark {
          animation: checkmark 0.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
