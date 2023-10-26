# SectionsECWeb
| Branch  | Build Status |
| ------------- | ------------- |
| main | [![Build Status](https://michalzeg.visualstudio.com/GitHub/_apis/build/status%2FCalculators%2Fmichalzeg.SectionsECWeb?branchName=main)](https://michalzeg.visualstudio.com/GitHub/_build/latest?definitionId=34&branchName=main) |


<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
<!-- ABOUT THE PROJECT -->
## About The Project
Web application calculating concrete section capacity according to EN-1995. 

![image](https://github.com/michalzeg/SectionsECWeb/assets/16364170/ac161ac6-c8f8-4e26-a56a-60384852539f)

### Built With

* .NET
* Angular
* Bootstrap
* svg.js

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

Before you start please make sure you have installed the following software
* Node.js
* .NET SDK

### Installation
Clone the repo
   ```sh
   git clone https://github.com/michalzeg/SectionsECWeb.git
   ```
Run the project using provided PowerShell script
   ```sh
   .\run.ps1
   ```
Open in your browser http://localhost:4200

OR use the provided docker image
   ```sh
   docker-compose -f .\build\docker-compose.yml up
   ```
and open in your browser http://localhost:5000
<!-- USAGE EXAMPLES -->
## Usage

You can see usage on the follwing animation

![sectionsec](https://github.com/michalzeg/SectionsECWeb/assets/16364170/da64138b-ebfa-4d1a-967f-123b119e891b)


<!-- LICENSE -->
## License

Distributed under the MIT License.
