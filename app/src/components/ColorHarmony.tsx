export interface ColorHarmonyProps {
  primaryColor: string;
  secondaryColor: string;
}

function ColorHarmony({ primaryColor, secondaryColor }: ColorHarmonyProps) {
  return (
    <div>
      <h5>ColorHarmony </h5>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          background: primaryColor,
          padding: "1rem",
          border: "1px solid black",
          borderRadius: "8px",
          width: "250px",
          height: "150px",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <p
          style={{
            fontSize: "1.05rem",
            fontWeight: 600,
            filter: "brightness(90%",
          }}
        >
          {primaryColor}
        </p>
        <p
          style={{
            fontSize: "1.2rem",
            fontWeight: 500,
            filter: "brightness(90%",
          }}
        >
          Primary
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          background: secondaryColor,
          padding: "1rem",
          border: "1px solid black",
          borderRadius: "8px",
          width: "250px",
          height: "150px",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <p
          style={{
            fontSize: "1.05rem",
            fontWeight: 600,
            filter: "brightness(90%",
          }}
        >
          {secondaryColor}
        </p>
        <p
          style={{
            fontSize: "1.2rem",
            fontWeight: 500,
            filter: "brightness(90%",
          }}
        >
          Secondary
        </p>
      </div>
      <div>
        <p>Color Combination:</p>
        <datalist>
          <option>Complementary</option>
        </datalist>
      </div>
    </div>
  );
}

export default ColorHarmony;
