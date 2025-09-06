# About Project

This project is a chat application that consumes the [hackett-back-end](https://github.com/andreifigueiredo/hackett-back-end) project. It has a basic behavior of scrolling to the end whenever there is a new message and also a disable on the button when the input is empty. The default URL for the `hackett-back-end` is set to `http://localhost:3000`, but you can change this in your `.env` file. For an example, see the `.env.example` file.

The project uses Docker to provide a consistent development. Follow the steps below to get started.

<img width="1919" height="949" alt="image" src="https://github.com/user-attachments/assets/d6f7dfce-4f46-4f84-a91a-6919a86aa3c0" />

## Sample Questions

Here are three sample questions to demonstrate the chatbot's capabilities as a Brazilian cuisine expert, along with their expected answer snippets.

### 1. Question: What are the main ingredients of a traditional "feijoada"?

Expected Answer: The response from the LLM is expected to be a fluent, well-structured text that correctly identifies the main ingredients of a traditional feijoada. It should mention the core components, such as black beans, and various types of pork and beef. The answer may also include additional details, such as serving suggestions (like rice, farofa, and collard greens) and a brief description of the dish's cultural significance in Brazil.

### 2. What are the key differences between a "moqueca capixaba" and a "moqueca baiana"?

Expected Answer: The response should be a concise and informative comparison of the two regional variations of moqueca. It must correctly identify the primary differentiating factors, such as the use of urucum oil and lack of dendê oil in the moqueca capixaba, versus the use of dendê oil and coconut milk in the moqueca baiana. The answer should also briefly describe the flavor profile and appearance of each version.

### 3. Question: What is the cultural significance of "brigadeiro" in Brazilian celebrations?

Expected Answer: The response should explain the role of brigadeiro as a staple dessert in Brazilian celebrations. It should mention its presence at children's birthday parties and other festive gatherings, and its simple preparation (condensed milk, cocoa powder, butter). The answer may also touch on its widespread popularity and how it's often considered a symbol of joy and togetherness.

## Prerequisites

Make sure you have [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.

## Setup and Running (with Docker)

### 1. Environment Variables

Create a file named `.env` in the root of the project. A sample file named `.env.example` should be available to guide you.

### 2. Install Dependencies

Install the project's dependencies using npm within the `react-app` service.

```Bash
docker compose run --rm react-app npm install
```

### 3. Start the Development Server

Start all services in detached mode. This will build the Docker images and run the application. The `react-app` service is configured to restart automatically on changes and sync your local code with the container.

```Bash
docker compose up -d
```

The application will be accessible at `http://localhost:8000`.

## Key Commands

* `docker compose up -d`: Starts the development server in the background.

* `docker compose down`: Stops and removes all containers, networks, and volumes.

* `docker compose run --rm react-app npm install`: Installs npm dependencies. The `--rm` flag removes the temporary container after the command completes.

* `docker compose logs -f`: Follows the logs of all running services.

## Alternative Setup (Without Docker)

If you prefer to run the project without Docker, you can do so by following these steps.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### 1. Install Dependencies

Navigate to the project directory and install the dependencies.

```Bash
npm install
```

### 2. Start the Development Server

```Bash
npm run dev
```
