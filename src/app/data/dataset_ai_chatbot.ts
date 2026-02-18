// dataset_ai_chatbot.ts
export const datasetChatbot = [
  {
    Reason: "NoChuteAvailable",
    RootCause: "All assigned chutes are reported as full",
    Summary: "Reported in DV telegram by LLC",
    Recommendation: [
      "Check if all the chutes are full",
      "Provide a sample shipment id here and will analyze the equipment logs",
      "If no equipment logs be visible, please create a PDSM ticket."
    ]
  },
  {
    Reason: "ConveyorStopped",
    RootCause: "Motor fault or emergency stop engaged",
    Summary: "Reported in DV telegram by LLC",
    Recommendation: [
      "Check conveyor motor and sensors",
      "Ensure emergency stop is not engaged"
    ]
  },
  // add more issues here
];
