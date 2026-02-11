import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/models", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch models");
    }

    const Resdata = await response.json();

    const freeModels = await Resdata.data.filter((model) => {
      const promptPrice = parseFloat(model.pricing?.prompt || "0");
      const completionPrice = parseFloat(model.pricing?.completion || "0");
      return promptPrice === 0 && completionPrice === 0;
    });

    const formatedModels = freeModels.map((model) => ({
      id: model.id,
      name: model.name,
      description: model.description,
      context_length: model.context_length,
      pricing: model.pricing,
      architecture: model.architecture,
      top_provider: model.top_provider,
    }));

    return NextResponse.json({
      models: formatedModels,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch models" },
      { status: 500 },
    );
  }
};
