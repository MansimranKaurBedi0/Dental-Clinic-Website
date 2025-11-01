import { ServiceCard } from "./ServiceCard";

export function Service() {
  return (
    <>
      <h1 style={{ marginLeft: "35%", marginTop: "70px", fontSize: "70px" }}>
        Our Services
      </h1>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          marginLeft: "15%",
          marginTop: "5%",

          // backgroundImage:
          //   'url("https://i.pinimg.com/736x/0e/e6/33/0ee6333097bc3ff577ac21fd385a4b27.jpg")',
          // backgroundSize: "cover", // image cover kare pura div
          // backgroundPosition: "center",
        }}
      >
        <div style={{ display: "flex", gap: "50px" }}>
          <ServiceCard
            img={
              "https://i.pinimg.com/736x/75/ec/d3/75ecd36bdb68fe29ec68c220438f3c48.jpg"
            }
            title="Braces"
          ></ServiceCard>
          <ServiceCard
            img={
              "https://i.pinimg.com/736x/3f/ce/c9/3fcec957e4578b96aff1e64f24b07eef.jpg"
            }
            title="Filling"
          ></ServiceCard>
          <ServiceCard
            img={
              "https://i.pinimg.com/736x/44/a8/a1/44a8a1661595eb9c3d635cbe298cdb10.jpg"
            }
            title="Scaling"
          ></ServiceCard>
        </div>
        <div style={{ display: "flex", gap: "50px" }}>
          <ServiceCard
            img={
              "https://i.pinimg.com/1200x/f6/bf/3f/f6bf3f7e8dd00246b0e9c525f674ae5e.jpg"
            }
            title="Smile Designing"
          ></ServiceCard>
          <ServiceCard
            img={
              "https://i.pinimg.com/736x/a0/8a/2c/a08a2ce0d2e8dbc359748733e54fb0f3.jpg"
            }
            title="Aligners"
          ></ServiceCard>
          <ServiceCard
            img={
              "https://i.pinimg.com/736x/2d/d3/f8/2dd3f855aa443214f3009a1b7d794d3a.jpg"
            }
            title="Extraction"
          ></ServiceCard>
        </div>
      </div>
    </>
  );
}
