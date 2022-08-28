### Azure
***

# DevOps

- Azure DevOps provides developer services for allowing teams to plan work, collaborate on code development, and build and deploy applications. 
- Azure DevOps supports a collaborative culture and set of processes that bring together developers, project managers, and contributors to develop software. 
- It allows organizations to create and improve products at a faster pace than they can with traditional software development approaches.
- Azure DevOps provides integrated features that you can access through your web browser or IDE client. 
- You can use one or more of the following standalone services based on your business needs:
    - Azure **Repos** provides Git repositories or Team Foundation Version Control (TFVC) for source control of your code.
        > Azure DevOps supports two forms of version control - Git and Azure Repos.
    - Azure **Pipelines** provides build and release services to support continuous integration and delivery of your applications.
      - Azure Pipelines combines continuous integration (CI) and continuous delivery (CD) to test and build your code and ship it to any target.
    - Azure **Boards** delivers a suite of Agile tools to support planning and tracking work, code defects, and issues using Kanban and Scrum methods.
      - Quickly and easily track work, issues, and code defects associated with your project.
    - Azure **Test** Plans provides several tools to test your apps, including manual/exploratory testing and continuous testing.
    - Azure **Artifacts** allows teams to share packages such as Maven, npm, NuGet, and more from public and private sources and integrate package sharing into your pipelines.

- **Continuous Integration (CI)** 
  - It is the practice used by development teams of automating merging and testing code. 
  - Implementing CI helps to catch bugs early in the development cycle, which makes them less expensive to fix. 
  - Automated tests execute as part of the CI process to ensure quality. 
  - Artifacts are produced from CI systems and fed to release processes to drive frequent deployments.

- **Continuous Delivery (CD)** 
  - It is a process by which code is built, tested, and deployed to one or more test and production environments. 
  - Deploying and testing in multiple environments increases quality. 
  - CI systems produce deployable artifacts, including infrastructure and apps. 
  - Automated release processes consume these artifacts to release new versions and fixes to existing systems. 
  - Monitoring and alerting systems run continually to drive visibility into the entire CD process.

- **Continuous Testing (CT)** on-premises or in the cloud is the use of automated build-deploy-test workflows, with a choice of technologies and frameworks that test your changes continuously in a fast, scalable, and efficient manner.