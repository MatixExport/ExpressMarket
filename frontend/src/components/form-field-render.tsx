import { Input } from "@/components/ui/input"
import {
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"



type FormFieldProps = {
    label: string;
    placeholder: string;
    field: any;
    type:string;
};

const FormFieldRender: React.FC<FormFieldProps> = ({
    label,
    placeholder,
    field,
    type
    }) => {


    return (
        <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input type={type} placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
};

export default FormFieldRender;