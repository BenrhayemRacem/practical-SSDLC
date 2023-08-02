
## NB:
The README is a part from the following report
[DevSecOps_Report.pdf](https://github.com/BenrhayemRacem/practical-SSDLC/files/12245011/DevSecOps_GL4-4.pdf)
 . This report contains a detailed description about the project and its whole lifecycle.

 
# practical-SSDLC
Secure software development life cycle (SSDLC) is crucial because application security has become a paramount concern.
Throughout the project, we diligently applied SSDLC principles at every stage of development. We initiated the process by incorporating secure design and architecture considerations, 
identifying potential threats and vulnerabilities, and implementing robust security measures. This
included the implementation of strong authentication mechanisms, secure data storage practices, and measures to defend against common attacks like cross-site scripting (XSS) and SQL
injection.

# SSDLC Major Steps:
 ## 1- Secure Requirement Gathering : 
 In this section, we defined strategies, goals and metrics which are mainly divided in two parts:
 First, educating  about secure coding best practices to fix the vulnerabilities during
the development process. We defined the number of critical vulnerabilities discovered using a
SAST application as a metric.
Second, fixing the vulnerabilities associated with the application’s dependencies when the vulnerability gets discovered. The metric in this strategy is the time spent from discovering the
vulnerability until fixing it.
Then we had to understand the policies. The main policy is to apply security controls on data. To reach that we defined two standards :
Authentication and Authorization should be well implemented to control posts and comments
adding and/or editing on the website , Applying a strict input validation to prevent XSS and
injection attacks. We used step-by-step OWASP Cheat Sheet Series to ensure data integrity
and safety.
 
 ## 2- Secure Architecture and Design
 In this section, we used first  **Threat Tree Diagram** to  analyze and understand the attack surface of a system and the potential
attack paths that an attacker could take to compromise the system. Second, we applied **STRIDE** (considers these potential Threats: Spoofing, Tampering,
Repudiation, Information disclosure, Denial of service and Elevation of privilege) on **Data Flow Diagrams** (DFD) 

 ## 3- Following Secure Coding Best Practises & Secure Build
 This phase includes the actual engineering and writing of the application while attempting to
meet all the requirements established during the secure requirement gathering, analysis and
planning phase.

The first part was to follow Secure Coding Best Practises. This is a list of some practises implemented in the project: 

1 Performing Input Validation 

2 File Upload Validation 

3 Upload Storage 

4 Prevent HTTP Parameter Pollution 

5 Only Return What Is Necessary

6 Protecting Sensitive Data 

7 Tokens Management 

8 Cross-Origin Resource Sharing 

9 Monitoring the event loop 

10 Taking precautions against brute-forcing 

11 Exception Handling 

12 Logging 

13 Database Access 

The second part is about Secure Build where we audited dependencies using NPM and we used two **Software Composition Analysis (SCA)** Scanners : Dependabot and Snyk




## 5- Secure Testing
Secure testing refers to the practice of conducting software testing with a focus on identifying
and addressing security vulnerabilities and risks. We configured all of our test tools
with Github workflows so they are automatically triggered on push and on pull requests to the
master branch. 

To start with, we used **Static Application Security Testing (SAST)**  with CodeQl, Github Secret Scanning, SonarQube.

In Addition, we used again SCA scanner Snyk to detect and test new dependencies introduced to the project


 ## 6- Secure Release and Deployment
 In software development, deployment refers to the process of making a software application
available for use. For that, we containerized our project into two deployable components (front-end and back-end). Then we installed Nginx as a web server.
