import { getAppConfig } from '../../config';
import { connectToDatabase } from './index';
import { Project } from './models/Project';

const seedData = {
    projects: [
        {
            title: "project 1",
            description: "description",
            status: "in progress",
            startDate: "2024-11-10",
            endDate: "2024-12-15",
        },
        {
            title: "project 2",
            description: "description",
            status: "in progress",
            startDate: "2024-11-20",
            endDate: "2024-12-20"
        },
        {
            title: "project 3",
            description: "description",
            status: "to be started",
            startDate: "2024-12-10",
            endDate: "2024-12-25",
        },
        {
            title: "project 4",
            description: "description",
            status: "to be started",
            startDate: "2025-01-01",
            endDate: "2025-01-31",
        },
        {
            title: "project 5",
            description: "description",
            status: "to be started",
            startDate: "2025-01-10",
            endDate: "2025-02-10",
        },
    ]
};

const seedDatabase = async () => {
    try {
        await connectToDatabase();
        await Project.deleteMany({});
        await Project.insertMany(seedData.projects);
        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();