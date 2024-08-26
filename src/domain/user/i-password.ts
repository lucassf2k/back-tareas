export interface IPassword {
  value: string;
  algorithm: string;
  salt: string;
  validate: (password: string) => boolean;
}
