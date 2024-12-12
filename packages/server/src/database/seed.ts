import { connectToDatabase } from "./index";
import { Task } from "./models/Task";

const seedData = {
 data: [
  {
   id: 1,
   text: "Project 1",
   start_date: "2019-08-20 10:30",
   end_date: "2019-08-28 10:30",
   duration: 8,
   progress: 0.6,
   priority: "high",
   type: "project",
  },
  {
   id: 2,
   text: "Task #1.1",
   start_date: "2019-08-21 10:30",
   end_date: "2019-08-24 10:30",
   duration: 3,
   progress: 0.4,
   priority: "normal",
   parent: 1,
  },
  {
   id: 3,
   text: "Task #1.2",
   start_date: "2019-08-23 10:30",
   end_date: "2019-08-26 10:30",
   duration: 3,
   progress: 0.4,
   priority: "low",
   parent: 1,
  },
  {
   id: 4,
   text: "Task #4",
   start_date: "2019-08-24 10:30",
   end_date: "2019-08-27 10:30",
   duration: 3,
   progress: 0.4,
   priority: "low",
  },
  {
   id: 5,
   text: "Task #5",
   start_date: "2019-08-24 10:30",
   end_date: "2019-08-27 10:30",
   duration: 3,
   progress: 0.4,
   priority: "low",
  },
  {
   id: 6,
   text: "Task #6",
   start_date: "2019-08-25 10:30",
   end_date: "2019-08-28 10:30",
   duration: 3,
   progress: 0.4,
   priority: "low",
  },
 ],
};

const seedDatabase = async () => {
 try {
  await connectToDatabase();
  await Task.deleteMany({});
  await Task.collection.dropIndexes();
  await Task.insertMany(seedData.data);
  console.log("Database seeded successfully");
  process.exit(0);
 } catch (error) {
  console.error("Error seeding database:", error);
  process.exit(1);
 }
};

seedDatabase();
