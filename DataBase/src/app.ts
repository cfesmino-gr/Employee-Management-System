import express from "express";
import cors from "cors";
import supabase from "./config/supabase";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "EmployEase API is running!",
  });
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend is working successfully!",
  });
});

app.get("/api/employees", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("employees")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load employees",
    });
  }
});

app.post("/api/employees", async (req, res) => {
  try {
    const {
      employeeId,
      name,
      email,
      department,
      position,
      status,
    } = req.body;

    const { data, error } = await supabase
      .from("employees")
      .insert({
        employeeId,
        name,
        email,
        department,
        position,
        status: status || "Active",
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add employee",
    });
  }
});

app.delete("/api/employees/:id", async (req, res) => {
  try {
    const { error } = await supabase
      .from("employees")
      .delete()
      .eq("id", req.params.id);

    if (error) {
      throw error;
    }

    res.json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete employee",
    });
  }
});

export default app;
