export default function Header2({ imageUrl, title, subtitle }) {
  return (
    <header
      style={{
        width: "100vw",
        minHeight: "300px",
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Overlay for better text contrast */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)", // maroon overlay
        }}
      ></div>

      {/* Text content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <h1 style={{ fontSize: "3rem", margin: 0 }} className="font-bold">{title}</h1>
        <p style={{ fontSize: "1.2rem", marginTop: "0.5rem" }}>{subtitle}</p>
      </div>
    </header>
  );
}
