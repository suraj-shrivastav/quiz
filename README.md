steps:

-fetchiing of data is done and it is displayed on the screen with the options to select the answer.
-the selected options are then stored in a array of objects which has question.id, option.id and option.is_correct(T/F).
-the next step would be to enhanhce the UI with some styling such as adding the css to correct answer and someting like points for the correct -answer to make it more interesting.
-the important thing that is yet to be done it the solution_show, resource_show, a page that will show the solution to the question.

-an extra functinality is to add a gemini-bot feature to the page that will help to explain the topic with more clarity.
    -the feature should be like a chat-icon, a btn for each question that onClick will take the question as prompt and explain it.
    -the prompt will be fixed like `Explain me ${question}`, one the icon is clicked the sidebar.jsx will open that will show the detailed explaination about the question.
    -the icon can only be clicked upon successfull submission of all the answers.

-a grading system can also be provided like `score`>90%--> A, 80%<`score`<90% --> B, etc.
poper effects if possible.