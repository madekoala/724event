import { render, screen } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
  focus: [
    {
      id: "1",
      title: "World economic forum",
      description: "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      id: "2",
      title: "Nordic design week",
      description: "Conférences sur le design de demain dans le digital",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/teemu-paananen-bzdhc5b3Bxs-unsplash1.png",
    },
    {
      id: "3",
      title: "Sneakercraze market",
      description: "Rencontres de spécialistes des Sneakers Européens.",
      date: "2022-05-29T20:28:45.744Z",
      cover: "/images/jakob-dalbjorn-cuKJre3nyYc-unsplash 1.png",
    },
  ],
};

describe("When Slider is created", () => {
  it("displays a list of cards", async () => {
    window.console.error = jest.fn(); 
    api.loadData = jest.fn().mockReturnValue(data); // Mock les données de l'API

    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );

    // Validation de l'affichage des éléments
    expect(await screen.findByText("World economic forum")).toBeInTheDocument();
    expect(await screen.findByText("janvier")).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Oeuvre à la coopération entre le secteur public et le privé."
      )
    ).toBeInTheDocument();
  });
});
