'use client'
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const questions = [
  {
    question: "Ce limbaj folosește Next.js?",
    options: ["Python", "JavaScript", "Go", "Ruby"],
    answer: "JavaScript",
  },
  {
    question: "Ce framework CSS este folosit în ShadCN?",
    options: ["Bootstrap", "Tailwind CSS", "Bulma", "Materialize"],
    answer: "Tailwind CSS",
  },
  {
    question: "Cum se face routing-ul în Next.js?",
    options: ["nextRouter", "React Router", "File-based routing", "Express Router"],
    answer: "File-based routing",
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswerClick = (option: string) => {
    setSelectedAnswer(option);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{quizFinished ? "Rezultatul tău" : `Întrebarea ${currentQuestion + 1}`}</CardTitle>
        </CardHeader>
        <CardContent>
          {quizFinished ? (
            <p className="text-xl font-bold">Ai obținut {score} din {questions.length}!</p>
          ) : (
            <>
              <p className="mb-4">{questions[currentQuestion].question}</p>
              <div className="flex flex-col gap-2">
                {questions[currentQuestion].options.map((option) => (
                  <Button
                    key={option}
                    variant={selectedAnswer === option ? "default" : "outline"}
                    onClick={() => handleAnswerClick(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              <Button
                className="mt-4 w-full"
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
              >
                {currentQuestion + 1 === questions.length ? "Finalizare" : "Următoarea întrebare"}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { db } from "@/database/drizzle";
// // import { questions } from "@/database/schema";
// import { eq } from "drizzle-orm";

//  const questions = [
//       {
//         question: "Ce limbaj folosește Next.js?",
//         options: ["Python", "JavaScript", "Go", "Ruby"],
//         answer: "JavaScript",
//       },
//       {
//         question: "Ce framework CSS este folosit în ShadCN?",
//         options: ["Bootstrap", "Tailwind CSS", "Bulma", "Materialize"],
//         answer: "Tailwind CSS",
//       },
//       {
//         question: "Cum se face routing-ul în Next.js?",
//         options: ["nextRouter", "React Router", "File-based routing", "Express Router"],
//         answer: "File-based routing",
//       },
//     ];

// export default function Quiz() {
//   const router = useRouter();
//   const { id } = router.query;
//   const [questionsList, setQuestionsList] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState("");
//   const [score, setScore] = useState(0);
//   const [quizFinished, setQuizFinished] = useState(false);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       if (id) {
//         const fetchedQuestions = await db
//           .select()
//           .from(questions)
//           .where(eq(questions.bookId, id))
//           .limit(13);
//         setQuestionsList(fetchedQuestions);
//       }
//     };
//     fetchQuestions();
//   }, [id]);

//   const handleAnswerClick = (option: string) => {
//     setSelectedAnswer(option);
//   };

//   const handleNextQuestion = () => {
//     if (selectedAnswer === questionsList[currentQuestion].answer) {
//       setScore(score + 1);
//     }
//     if (currentQuestion + 1 < questionsList.length) {
//       setCurrentQuestion(currentQuestion + 1);
//       setSelectedAnswer("");
//     } else {
//       setQuizFinished(true);
//     }
//   };

//   if (!questionsList.length) return <p>Încărcare întrebări...</p>;

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle>{quizFinished ? "Rezultatul tău" : `Întrebarea ${currentQuestion + 1}`}</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {quizFinished ? (
//             <p className="text-xl font-bold">Ai obținut {score} din {questionsList.length}!</p>
//           ) : (
//             <>
//               <p className="mb-4">{questionsList[currentQuestion].question}</p>
//               <div className="flex flex-col gap-2">
//                 {questionsList[currentQuestion].options.map((option) => (
//                   <Button
//                     key={option}
//                     variant={selectedAnswer === option ? "default" : "outline"}
//                     onClick={() => handleAnswerClick(option)}
//                   >
//                     {option}
//                   </Button>
//                 ))}
//               </div>
//               <Button
//                 className="mt-4 w-full"
//                 onClick={handleNextQuestion}
//                 disabled={!selectedAnswer}
//               >
//                 {currentQuestion + 1 === questionsList.length ? "Finalizare" : "Următoarea întrebare"}
//               </Button>
//             </>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
