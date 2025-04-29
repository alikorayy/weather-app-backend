export const zodErrorFormatter = (parsed: any) => {
    const formattedError = parsed.error.errors.map((err: any) => ({
        field: err.path.join("."),
        message: err.message,
      }));
    return formattedError;
}