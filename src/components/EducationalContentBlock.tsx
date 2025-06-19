import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // For a potential "Learn More" button
import { BookOpenText } from 'lucide-react'; // Example icon

interface EducationalContentBlockProps {
  title: string;
  summary: string;
  imageUrl?: string; // Optional image
  linkUrl?: string; // Optional link for "Learn More"
  category?: string;
}

const EducationalContentBlock: React.FC<EducationalContentBlockProps> = ({
  title,
  summary,
  imageUrl,
  linkUrl,
  category,
}) => {
  console.log("Rendering EducationalContentBlock:", title);

  return (
    <Card className="w-full overflow-hidden">
      {imageUrl && (
        <div className="aspect-video bg-gray-100">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between">
            <div>
                {category && <p className="text-xs text-blue-600 font-semibold mb-1 uppercase tracking-wide">{category}</p>}
                <CardTitle className="text-lg">{title}</CardTitle>
            </div>
            <BookOpenText className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm line-clamp-3">{summary}</CardDescription>
      </CardContent>
      {linkUrl && (
        <CardFooter>
          <Button variant="link" asChild className="p-0 h-auto">
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default EducationalContentBlock;