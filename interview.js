import { Configuration, OpenAIApi } from "openai";
import readline from "readline";
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askInterviewQuestion = async () => {
  const prompt = `You are a senior software engineer conducting an interview for a Backend role. Ask one technical question.`;
  const response = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  const question = response.data.choices[0].message.content;
  console.log("🤖 Interviewer: ", question);

  rl.question("💬 Your Answer: ", async (answer) => {
    const evalPrompt = `Evaluate this answer: "${answer}" for clarity, correctness, and completeness. Give a score out of 10 and feedback.`;
    const evalResponse = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: evalPrompt }],
    });

    console.log("🧠 Feedback: ", evalResponse.data.choices[0].message.content);
    rl.close();
  });
};

askInterviewQuestion();
