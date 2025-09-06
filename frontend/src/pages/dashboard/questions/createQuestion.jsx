import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export default function CreateQuestion() {
  const { register, handleSubmit, control } = useForm();

  const options = ["1", "2", "3"];

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-start p-6">
      <Card className="w-full max-w-lg rounded-2xl shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-indigo-700">Create a Question</CardTitle>
          <CardDescription className="text-gray-600">
            Enter the details below to add a new quiz question.
          </CardDescription>
        </CardHeader>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            {/* Question Title */}
            <div className="grid gap-4 mt02">
              <Label htmlFor="title" className="text-indigo-700">
                Question Title
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter your question here..."
                className="rounded-lg border-gray-300 focus:border-indigo-600 focus:ring-indigo-600"
                {...register("title", { required: true })}
              />
            </div>

            {/* Options Section */}
            <div className="grid gap-4 mt-4">
              <Label className="text-indigo-700">
                Add three options and mark the correct one
              </Label>

              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Input
                    type="text"
                    placeholder={`Option ${option}`}
                    className="flex-1 rounded-lg border-gray-300 focus:border-indigo-600 focus:ring-indigo-600"
                    {...register(`option${option}`, { required: true })}
                  />

                  {/* The Controller manages the checkbox state */}
                  <Controller
                    name="ansIndex"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value === option}
                        onCheckedChange={(checked) => {
                          // Only update the value if it's checked, making it radio-like
                          if (checked) {
                            field.onChange(option);
                          }
                        }}
                      />
                    )}
                  />
                  <Label
                    htmlFor={`option${option}`}
                    className="text-sm text-gray-600"
                  >
                    Correct
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3">
            <Button
              variant="outline"
              className="rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Create
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
