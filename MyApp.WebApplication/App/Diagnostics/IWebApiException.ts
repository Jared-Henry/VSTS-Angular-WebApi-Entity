interface IWebApiException {
    message:string,
    exceptionMessage?: string;
    exceptionType?: string;
    stackTrace: string;
    innerException?: IWebApiException
}