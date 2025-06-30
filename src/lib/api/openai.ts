import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

export class APIError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'APIError';
  }
}

export const optimizeResume = async (content: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert resume optimizer. Enhance the resume content to be more impactful, professional, and ATS-friendly while maintaining truthfulness."
        },
        {
          role: "user",
          content
        }
      ],
      temperature: 0.7,
    });

    if (!response.choices[0].message.content) {
      throw new APIError('Failed to optimize resume content', 'OPTIMIZATION_FAILED');
    }

    return response.choices[0].message.content;
  } catch (error) {
    if (error instanceof Error) {
      throw new APIError(
        'Failed to connect to optimization service. Please try again later.',
        'API_ERROR'
      );
    }
    throw error;
  }
};