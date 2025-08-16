export default function Header({ imageUrl, title, subtitle }) {
  return (
        <header
      className="w-screen min-h-96 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-lg">{subtitle}</p>
      </div>
    </header>

  );
}
