export const mockClassDetails = {
  id: "S101-2023",
  title: "English Starter",
  enrollment: {
    current: 18,
    max: 20
  },
  avgAttendance: 94.2,
  courseProgress: 62,
  actionRequired: {
    type: "Overdue Assessments",
    count: 3
  },
  upcomingSessions: [
    {
      id: "lsn-14",
      date: { month: "Oct", day: "24" },
      title: "Lesson 14: Phonetics",
      time: "08:00 AM - 10:00 AM",
      room: "Room 302",
      isPast: false
    },
    {
      id: "lsn-15",
      date: { month: "Oct", day: "26" },
      title: "Lesson 15: Interaction",
      time: "08:00 AM - 10:00 AM",
      room: "Room 302",
      isPast: true
    }
  ],
  instructor: {
    name: "Dr. Eleanor Vance",
    role: "Senior Linguist",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW9v1WbNaTbeEuFHcNQe90AzIWvUytZPWj1Jk2bKt97QiXTE3raQ19NxtEb_vnxogcgYQpcWr_yQ6E7-Q32ysLm8CZvCDiNHeZ2E8wtnJgDviWfrcJB3lvPdGo467fPclyY1bhXNy1YtndY8UtvzfXgo9cCHIp3gCFZZnxxR5V_bJBHQFmclQ_z6zCmfGjaxLkG_jEthE3mhKDuMyNw10E_CX-h9F4etmvldg-w6ENmfmX25ucSCEmPDCQKdm3n5zx9MEbtYCNCz0",
    rating: "4.9 / 5.0",
    teachingHours: "1,240 hrs",
    availability: "Mon, Wed, Fri"
  }
};
