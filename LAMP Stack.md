How to Install Linux, Apache, MySQL, and PHP LAMP Stack on Ubuntu 24.04LTS Server
=================================================================================

In this article we cover taking an Ubuntu 24.04LTS server and expanding it into a full blown Linux, Apache, MySQL, and PHP (LAMP) web server.

What is a LAMP Stack
--------------------

A LAMP stack is a popular framework for building and deploying web applications. The acronym stands for:

**Linux** serves as the operating system.

**Apache** handles the HTTP/HTTPS web requests.

**MySQL** manages and stores data – the data engine.

**PHP** is a programming language that processes the business logic and generates dynamic content.

A LAMP stack is a comprehensive web server that is very popular today, and has been so for 20-plus years.

The LAMP stack is widely used because it provides a robust and reliable platform with open-source components, meaning it’s cost-effective and highly customizable.


Prerequisites
-------------

You will need to have access to an Ubuntu 24.04LTS server and you will need to have sudo privileges.

Step 1 is to Update and Upgrade System Packages
-----------------------------------------------

The first thing you need to do is update the server to the latest package index. And then upgrade any local packages that need to be updated. And finally remove any non-used packages and Kernels.

This consists of 3 commands:
```bash
sudo apt update
```
The command **sudo apt update** – is used to update the list of available packages and their versions from the repositories defined in your system’s configuration files. It doesn’t actually install or upgrade any packages; it simply fetches the latest package information so that you can later install or upgrade packages with up-to-date information or code.

Running **apt update** regularly ensures that your system has the latest package information.

```bash
sudo apt upgrade
````
The **sudo apt upgrade** command is used to upgrade installed packages.


```bash
sudo apt autoremove
```

**sudo apt autoremove** is used to remove any old packages and old Kernels.

After running **sudo apt autoremove**, it is recommend to reboot to ensure everything is loaded properly.
```bash
sudo reboot
```


Step 2 Install the Apache Web Server
------------------------------------


Run the following command to download and install the Apache2 HTTP server along with any dependencies it requires.
```bash
sudo apt install apache2
```
To start the Apache service, run the command:
```bash 
sudo systemctl start apache2
```
TO stop the Apache service, run the following command:

```bash
sudo systemctl stop apache2
```
To set Apache to be started when the server starts up:
```bash
sudo systemctl enable apache2
```
To get the Apache service status:
```bash
sudo systemctl status apache2
```

**systemctl** is responsible for initializing and managing system services and resources during boot and runtime.

The output of **sudo systemctl status apache2** will look something like this:

    ● apache2.service - The Apache HTTP Server
         Loaded: loaded (/usr/lib/systemd/system/apache2.service; enabled ; preset: enabled)
         Active: active (running) since Fri 2024-09-06 21:49:22 UTC; 17min ago
           Docs: https://httpd.apache.org/docs/2.4/
        Process: 799 ExecStart=/usr/sbin/apachectl start (code=exited, status=0/SUCCESS)
       Main PID: 968 (apache2)
          Tasks: 6 (limit: 4614)
         Memory: 19.7M (peak: 19.9M)
            CPU: 437ms
         CGroup: /system.slice/apache2.service
                 ├─968 /usr/sbin/apache2 -k start
                 ├─995 /usr/sbin/apache2 -k start
                 ├─996 /usr/sbin/apache2 -k start
                 ├─997 /usr/sbin/apache2 -k start
                 ├─998 /usr/sbin/apache2 -k start
                 └─999 /usr/sbin/apache2 -k start
    
    Sep 06 21:49:15 firstinstall systemd[1]: Starting apache2.service - The Apache HTTP Server...
    Sep 06 21:49:22 firstinstall apachectl[859]: AH00558: apache2: Could not reliably determine the server's full>
    Sep 06 21:49:22 firstinstall systemd[1]: Started apache2.service - The Apache HTTP Server.
    
    
Verify Apache is configured properly by entering the following command in a browser URL `http://<your server's IP Address>/`

Step 3 Activate and Configure the Uncomplicated Firewall (UFW)
--------------------------------------------------------------

This consists of 6 commands:

1\. **sudo ufw enable**

2\. **sudo ufw disable**

3\. **sudo ufw status**

4\. **sudo ufw app list**

5\. **sudo ufw allow 'Apache Full'**

6\. **sudo ufw allow 'OpenSSH'**

Ubuntu uses the **Uncomplicated Firewall (UFW)**.

The Uncomplicated Firewall is a wrapper that makes it easier to manage the Linux built-in iptables firewall. In other words, iptables is the actual firewall.

For our purposes, we will use a subset of the UFW commands. Basically, all we need from UFW is to open the Apache server’s ports, along with opening the OpenSSH ports. UFW can do a lot more than we will cover here.

Enable and start UFW: **sudo ufw enable** This activates the firewall with default settings.

1\. **sudo ufw disable** turns off the firewall.

2\. **sudo ufw status** shows whether UFW is active and displays the rules currently in place.

In Ubuntu, the Uncomplicated Firewall (UFW) simplifies the process of managing firewall rules. UFW has predefined application profiles for commonly used services.

To allow the Apache web server port 80 (not secured/HTTP) and port 443 (secured/ HTTPS) issue the command **sudo ufw allow ‘Apache Full’**

To allow the OpenSSH port to be opened, issue the command **s****udo ufw allow ‘OpenSSH’**

At this point you can run **sudo ufw status** to verify how UFW is configured.

To verify Apache is still available access **http://<your server’s IP>/** in your web browser.

Step 4 Install the MySQL Data Server
------------------------------------

To install the MySQL package and all of its dependencies run:
```bash
sudo apt install mysql-server
```
To start the service:
```bash
sudo systemctl start mysql
```
to stop the service:
```bash
sudo systemctl stop mysql
```
To enable the service start at startup:
```bash
sudo systemctl enable mysql
```
to check the status:
```bash
sudo systemctl status mysql
```

Step 5 Install PHP
------------------

To install PHP run:
```bash
sudo apt install php libapache2-mod-php php-mysql
```
To verify the PHP programming language has been installed, run the command:
```bash
php -v
```

Step 6 Install Command-Line PHP
-------------------------------

To install the PHP command line package issue the command:
```bash
sudo apt install php-cli
```

To verify issue the command
```bash
php -v
```

Step 7 Install phpMyAdmin
--------------------------
To install `phpMyAdmin` use the following command:
```bash
sudo apt install phpmyadmin
```
follow the onscreen instructions. the open the link `http://[Server_IP]/phpmyadmin` and use the username `root` and password `password`.

Step 8 Test Your LAMP Stack
---------------------------

### Test PHP


Enter the command:
```bash
sudo nano /var/www/html/info.php
```
Cut and paste the following code into the file being edited.
```php
    <?php
    phpinfo();
    ?>
```
Test using a browser by entering the following in the URL of the browser and then press the enter key. `http://<your-ip-address>/info.php`

### Test PHP/MySQL Connection

Enter the command:
```bash
sudo mysql
```
Enter the command:
```bash
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```
Enter the command:
```bash
exit;
```
Enter the command:
```bash
sudo nano /var/www/html/test-db-connection.php
```
Copy and paste the following into the file `test-db-connection.php`
```php
    <?php
    $servername = "localhost";
    $username = "root";
    $password = "password";
    // Create connection
    $conn = mysqli_connect($servername, $username, $password);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    echo "Connected successfully";
    ?>
```
Test the connection using a browser by entering the following `http://[your_ip_address]/test-db-connection.php` in the URL of the browser and then pressing the enter key. 

If you would like to check the status of MySQL enter the command"
```bash
sudo systemctl status mysql
```
### Test Command line PHP

Create the follwoing file `/var/www/html/test-cli.php`:
```bash
touch test-cli.php
```
open the file:
```bash
sudo nano /var/www/html/test-cli.php
```

Copy and paste the following:
```php
    <?php
        echo "PHP CLI is working!\n";
    ?>
```
On the command line issue the command:
```bash
php /var/www/html/test-cli.php
```

### Connect to Visual studio code
To connect vscode to your server install the `Remote-SSH` extension `ms-vscode-remote.remote-ssh`.
Then use one of the many ways to connect to the server through SSH.
To fix permissions for saving project files located `/var/www/html/` use the following extension: 
`
Name: Save as Root in Remote - SSH
Id: yy0931.save-as-root
Description: Edit configuration files with root privileges while using the Remote - SSH extension
Version: 1.8.0
Publisher: yy0931
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=yy0931.save-as-root
`
or you can simply change the file owner through vscode terminal:
```bash
chown ibrahim /var/www/html/site
```



Troubleshooting
---------------

The command **sudo systemctl status mysql** will display the current status of the MySQL service, including whether it is active, inactive, or failed. If MySQL is running properly, you should see an output indicating that the service is active and running. If it’s not running or has issues, the status output will provide some details on the problem.

Conclusion
----------

In this article, I covered how to install Apache, MySQL, and PHP on Linux, a LAMP Stack on Ubuntu 24.04LTS Server. Then we test that the configuration to verify it is working correctly. I use Ubuntu 24.04 LTS, Apache2, MySQL and PHP to build web apps.

