// Temporary file to generate BCrypt password hash
// Run this with: dotnet script GeneratePasswordHash.cs
// Or add to Program.cs temporarily

using System;

public class GeneratePasswordHash
{
    public static void Main()
    {
        string password = "password123";
        string hash = BCrypt.Net.BCrypt.HashPassword(password);
        
        Console.WriteLine("Password: " + password);
        Console.WriteLine("BCrypt Hash: " + hash);
        Console.WriteLine();
        Console.WriteLine("Verification test: " + BCrypt.Net.BCrypt.Verify(password, hash));
    }
}
