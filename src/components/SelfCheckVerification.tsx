import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const SELF_CHECK_ITEMS = [
  "Я понимаю основные концепции этой темы",
  "Я могу объяснить эту тему своими словами",
  "Я готов применить эти знания на практике",
  "Я уверен в своем понимании материала",
];

interface SelfCheckVerificationProps {
  onComplete: (passed: boolean) => void;
}

export const SelfCheckVerification = ({ onComplete }: SelfCheckVerificationProps) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});

  const handleCheck = (index: number) => {
    setCheckedItems({ ...checkedItems, [index]: !checkedItems[index] });
  };

  const handleSubmit = () => {
    const allChecked = SELF_CHECK_ITEMS.every((_, index) => checkedItems[index]);
    onComplete(allChecked);
  };

  const allChecked = SELF_CHECK_ITEMS.every((_, index) => checkedItems[index]);

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Самопроверка</h3>
        <p className="text-sm text-muted-foreground">
          Честно оцените свое понимание материала
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          {SELF_CHECK_ITEMS.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Checkbox
                id={`check-${index}`}
                checked={checkedItems[index] || false}
                onCheckedChange={() => handleCheck(index)}
              />
              <Label
                htmlFor={`check-${index}`}
                className="text-sm cursor-pointer leading-relaxed"
              >
                {item}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      <Button onClick={handleSubmit} disabled={!allChecked} className="w-full">
        Подтвердить
      </Button>
    </div>
  );
};
