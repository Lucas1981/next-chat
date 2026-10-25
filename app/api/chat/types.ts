type RolesType = "user" | "assistant" | "system";

type MessageType = {
  role: RolesType;
  content: string;
};

export type RequestType = {
  sentMessages: MessageType[];
};
