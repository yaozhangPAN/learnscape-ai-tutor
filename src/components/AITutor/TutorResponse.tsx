
interface TutorResponseProps {
  response: string;
}

export const TutorResponse = ({ response }: TutorResponseProps) => {
  if (!response) return null;
  
  return (
    <div>
      <label className="text-sm font-medium block mb-1">AI Tutor Response</label>
      <div className="bg-gray-50 border rounded-md p-6 prose prose-sm max-w-none">
        <div dangerouslySetInnerHTML={{ __html: response }} />
      </div>
    </div>
  );
};
