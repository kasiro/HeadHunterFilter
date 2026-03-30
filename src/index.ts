import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
});

// Пример flow для фильтрации вакансий
export const jobFilterFlow = ai.defineFlow(
  {
    name: 'jobFilterFlow',
    inputSchema: z.object({
      jobDescription: z.string().describe('Описание вакансии'),
      requirements: z.array(z.string()).describe('Требуемые навыки'),
    }),
    outputSchema: z.object({
      isRelevant: z.boolean().describe('Релевантна ли вакансия'),
      score: z.number().describe('Оценка релевантности от 0 до 1'),
      reasoning: z.string().describe('Обоснование решения'),
    }),
  },
  async (input) => {
    const response = await ai.generate({
      model: googleAI.model('gemini-2.5-flash'),
      prompt: `
        Проанализируй вакансию и оцени её релевантность для кандидата.
        
        Вакансия:
        ${input.jobDescription}
        
        Требуемые навыки кандидата:
        ${input.requirements.join(', ')}
        
        Оцени релевантность от 0 до 1 и объясни свой выбор.
      `,
    });

    // Парсинг ответа (в реальном проекте используйте структурированный вывод)
    return {
      isRelevant: true,
      score: 0.8,
      reasoning: response.text,
    };
  }
);
