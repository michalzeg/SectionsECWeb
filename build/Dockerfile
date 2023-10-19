

FROM mcr.microsoft.com/dotnet/nightly/sdk:7.0 AS net-core-with-node
ARG NODE_VERSION

ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

RUN apt-get update && apt-get install -y apt-utils &&\
	apt-get update && apt-get install -y libkrb5-dev &&\
	apt-get update && apt-get install -y build-essential &&\
	apt-get update && apt-get install -y python make g++ &&\
	apt install -y curl &&\
	curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash &&\
	. "/root/.nvm/nvm.sh" && nvm install ${NODE_VERSION} &&\
    . "/root/.nvm/nvm.sh" && nvm use v${NODE_VERSION} &&\
    . "/root/.nvm/nvm.sh" && nvm alias default v${NODE_VERSION} 
RUN npm install -g yarn &&\
	apt-get -qq update

RUN apt-get update &&\
	apt-get install -y python3

FROM net-core-with-node as base-build

WORKDIR /app
COPY ./Binaries ./Binaries
COPY ./src ./src

FROM base-build as base-publish
ARG PROJECT_NAME
RUN dotnet publish ./src/${PROJECT_NAME}/${PROJECT_NAME}.csproj -c Release -o /app/out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0

ARG PROJECT_NAME
ENV PROJECT_NAME=$PROJECT_NAME

WORKDIR /app
COPY --from=base-publish /app/out .

ENTRYPOINT dotnet ${PROJECT_NAME}.dll

