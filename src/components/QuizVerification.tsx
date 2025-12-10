import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle } from "lucide-react";

interface Question {
  id: string;
  question_text: string;
  options: string[];
  correct_index: number;
}

interface QuizVerificationProps {
  questions: Question[];
  onComplete: (passed: boolean) => void;
}

export const QuizVerification = ({ questions, onComplete }: QuizVerificationProps) => {
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<{ [key: string]: boolean }>({});

  const handleSubmit = () => {
    const newResults: { [key: string]: boolean } = {};
    let correctCount = 0;

    questions.forEach((q) => {
      const isCorrect = answers[q.id] === q.correct_index;
      newResults[q.id] = isCorrect;
      if (isCorrect) correctCount++;
    });

    setResults(newResults);
    setSubmitted(true);

    const passed = correctCount >= Math.ceil(questions.length * 0.7);
    setTimeout(() => onComplete(passed), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Проверка знаний</h3>
        <p className="text-sm text-muted-foreground">
          Ответьте на вопросы, чтобы подтвердить освоение темы
        </p>
      </div>

      {questions.map((question, index) => (
        <Card key={question.id} className="p-4">
          <div className="mb-3 flex items-start gap-2">
            <span className="font-semibold text-sm">Вопрос {index + 1}:</span>
            <p className="flex-1">{question.question_text}</p>
            {submitted && (
              <div>
                {results[question.id] ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive" />
                )}
              </div>
            )}
          </div>

          <RadioGroup
            value={answers[question.id]?.toString()}
            onValueChange={(value) =>
              setAnswers({ ...answers, [question.id]: parseInt(value) })
            }
            disabled={submitted}
          >
            {question.options.map((option, optIndex) => (
              <div key={optIndex} className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value={optIndex.toString()} id={`q${question.id}-${optIndex}`} />
                <Label
                  htmlFor={`q${question.id}-${optIndex}`}
                  className={`cursor-pointer ${
                    submitted
                      ? optIndex === question.correct_index
                        ? "text-success font-medium"
                        : answers[question.id] === optIndex && !results[question.id]
                        ? "text-destructive"
                        : ""
                      : ""
                  }`}
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </Card>
      ))}

      {!submitted && (
        <Button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length !== questions.length}
          className="w-full"
        >
          Отправить ответы
        </Button>
      )}

      {submitted && (
        <Card className="p-4 bg-card/50">
          <p className="text-center">
            Результат: {Object.values(results).filter(Boolean).length} из {questions.length}{" "}
            правильных ответов
          </p>
        </Card>
      )}
    </div>
  );
};
