### AWS Amazon WorkSpaces
***

- AWS Elastic Beanstalk

  - Elastic Beanstalk reduces management complexity without restricting choice or control. You simply upload your application, and Elastic Beanstalk automatically handles the details of capacity provisioning, load balancing, scaling, and application health monitoring.

  - Elastic Beanstalk supports applications developed in Go, Java, .NET, Node.js, PHP, Python, and Ruby.
  - 
  - When you create the example application, Elastic Beanstalk creates the following AWS resources:

    - **EC2 instance** – An Amazon EC2 virtual machine configured to run web apps on the platform you choose.

    -  Each platform runs a different set of software, configuration files, and scripts to support a specific language version, framework, web container, or combination thereof. Most platforms use either Apache or nginx as a reverse proxy that processes web traffic in front of your web app, forwards requests to it, serves static assets, and generates access and error logs.

    - **Instance security group** – An Amazon EC2 security group configured to allow incoming traffic on port 80. This resource lets HTTP traffic from the load balancer reach the EC2 instance running your web app. By default, traffic is not allowed on other ports.

    - **Amazon S3 bucket** – A storage location for your source code, logs, and other artifacts that are created when you use Elastic Beanstalk.

   -  **Amazon CloudWatch alarms** – Two CloudWatch alarms that monitor the load on the instances in your environment and are triggered if the load is too high or too low. When an alarm is triggered, your Auto Scaling group scales up or down in response.

    - **AWS CloudFormation stack** – Elastic Beanstalk uses AWS CloudFormation to launch the resources in your environment and propagate configuration changes. The resources are defined in a template that you can view in the AWS CloudFormation console.

    - **Domain name** – A domain name that routes to your web app in the form subdomain.region.elasticbeanstalk.com.

> Amazon Elastic Compute Cloud (Amazon EC2)

- **Amazon Simple Storage Service (Amazon S3)**
  - is an object storage service that offers industry-leading scalability, data availability, security, and performance. 
  - Amazon S3 provides management features so that you can optimize, organize, and configure access to your data to meet your specific business, organizational, and compliance requirements. 
  - You can get started with Amazon S3 by working with **buckets** and **objects**. A bucket is a container for objects. An object is a file and any metadata that describes that file.
  - To store an object in Amazon S3, you create a bucket and then upload the object to the bucket. When the object is in the bucket, you can open it, download it, and move it. When you no longer need an object or a bucket, you can clean up your resources. 

- **Amazon Relational Database Service (Amazon RDS)**
  - is a web service that makes it easier to set up, operate, and scale a relational database in the AWS Cloud. 
  - It provides cost-efficient, resizable capacity for an industry-standard relational database and manages common database administration tasks. 
  - A DB engine is the specific relational database software that runs on your DB instance. Amazon RDS currently supports the following engines:
    - MySQL
    - MariaDB
    - PostgreSQL
    - Oracle
    - Microsoft SQL Server

- **AWS IoT**
  - AWS IoT provides the cloud services that connect your IoT devices to other devices and AWS cloud services. 
  - AWS IoT provides device software that can help you integrate your IoT devices into AWS IoT-based solutions. 
  - If your devices can connect to AWS IoT, AWS IoT can connect them to the cloud services that AWS provides. 