"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUser } from "@/lib/getUser";

interface PollOption {
  id: string;
  text: string;
}

export default function PollForm({
  params: { pollOptions, voteAction },
}: {
  params: {
    pollOptions: PollOption[];
    voteAction: (optionId: string) => void;
  };
}) {
  const user = useUser();

  const optionsId = pollOptions.map((option) => option.id);

  const FormSchema = z.object({
    option: z.enum([optionsId[0], ...optionsId.slice(1)], {
      required_error: "You need to select an option to vote.",
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    voteAction(data.option);
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle>Poll</CardTitle>
        <CardDescription>Vote in the poll...</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="option"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {pollOptions.map((option, index) => (
                        <FormItem
                          className="flex items-center space-x-3 space-y-0"
                          key={index}
                        >
                          <FormControl>
                            <RadioGroupItem value={option.id} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.text}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Vote</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
