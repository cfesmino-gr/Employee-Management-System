import "dotenv/config";
import app from "./app";
import supabase from "./config/supabase";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    const { error } = await supabase
      .from("employees")
      .select("id")
      .limit(1);

    if (error) {
      throw error;
    }

    console.log("Supabase database connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Supabase database connection failed:", error);
  }
}

startServer();
