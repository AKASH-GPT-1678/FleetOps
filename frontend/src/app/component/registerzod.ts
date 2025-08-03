import z from "zod";

export const RegisterSchema = z.object({
    firstName: z
        .string()
        .min(3, { message: "First name must be at least 3 characters long" }),
    lastName: z
        .string()
        .min(3, { message: "Last name must be at least 3 characters long" }),
    email: z.string().email(),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" }),

    role: z
        .enum(["ROLE_MANAGER" , "ROLE_DRIVER"])
        .default("ROLE_MANAGER"),
        
});



export type RegisterSchemaType = z.infer<typeof RegisterSchema>;