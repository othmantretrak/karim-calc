import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { slug } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        // Fetch all variations for this product
        variations: {
          include: {
            // For each variation, fetch its selected attribute values
            attributes: {
              include: {
                // And for each value, include its parent attribute type (e.g., "Color")
                attribute: true,
              },
            },
          },
        },
        // Also fetch the available attributes for this product to build the UI
        attributes: {
          include: {
            values: true, // Get all possible values (e.g., Blue, Red, Green)
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // We can simplify the data structure for the frontend if we want
    // For now, we'll send it as is.

    res.status(200).json(product);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
