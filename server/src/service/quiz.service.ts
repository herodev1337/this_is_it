import Quiz, { QuizDocument } from '../model/quiz.model';
import { DocumentDefinition, FilterQuery, UpdateQuery } from 'mongoose';

export async function createQuiz(
  input: DocumentDefinition<Omit<QuizDocument, 'createdAt' | 'updatedAt'>>
) {
  try {
    return await Quiz.create(input);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function findQuiz(query: FilterQuery<QuizDocument>) {
  return Quiz.findOne(query).lean();
}

export async function getQuizList(query: FilterQuery<QuizDocument>) {
  return Quiz.find(query).lean();
}

export async function updateQuiz(
  query: FilterQuery<QuizDocument>,
  newQuiz: UpdateQuery<
    DocumentDefinition<Omit<QuizDocument, 'createdAt' | 'updatedAt'>>
  >
) {
  return Quiz.updateOne(query, newQuiz);
}

export async function deleteQuiz(query: FilterQuery<QuizDocument>) {
  return Quiz.deleteOne(query);
}
