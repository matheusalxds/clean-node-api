export interface Encryter {
  encrypt (id: string): Promise<string>
}
