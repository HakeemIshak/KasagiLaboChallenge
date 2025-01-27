Kasagi Labo Programming Challenge - README

Hi there! 😊
Thank you for taking the time to open this README file. Below are the step-by-step instructions for running my solutions to the challenges.

---

Challenge A
For Challenge A, I used TypeScript and decided to run the script using Deno (https://deno.com/). Deno allows direct execution of TypeScript files without additional configuration.

Steps:
1. Install Deno (if you don’t have it installed):
   Follow the Deno installation guide: https://docs.deno.com/runtime/getting_started/installation/
2. Run the script:
   Execute the following command in your terminal:
   `deno run --allow-write challenge_a.ts`
3. Output:
   After running the script, a file named `challenge-A.txt` should be created in the local directory.

---

Challenge B
For Challenge B, the program processes the file generated in Challenge A and prints the objects and their types to the console.

Steps:
1. Run the script with the following command:
   `deno run --allow-write --allow-read challenge_b.ts`
2. Output:
   After running the script, a file named `challenge-B.log` should be created in the local directory.

---

Challenge C
For Challenge C, I dockerized Challenge B so it processes the output from Challenge A inside a container. The processed output is saved to a file and made accessible on the host machine.

Steps:
1. Before running this Challenge, you might want to remove leftover from previous Challenge B execution. You can remove folder `logs` to make sure this folder not copied to Docker image when you build it.
2. Build the Docker image:
   `docker build -t kasagi-test-hakeem .`
3. Run the Docker container:
   Execute the following command (note: it mounts a folder in your home directory to expose the output file):
   `docker run --rm -v ~/logs:/app/logs kasagi-test-hakeem`
   Disclaimer: Your system may prompt for permission since the command uses your home directory.

4. Output:
   The processed file will be saved in the `~/logs` directory on your host machine.

---

Thank you for reviewing my code! Feel free to reach out if you have any questions or need further clarification. 😊
