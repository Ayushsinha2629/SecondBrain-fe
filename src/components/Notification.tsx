export function Notification({ message, show }: { message: string; show: boolean }) {
    return (
      <div
        className={`fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-transform duration-500 ${
          show ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
        }`}
      >
        {message}
      </div>
    );
  }