Structure of terraform project
------------------------------
This project contain two modules, each module has (main.tf, output.tf, vairables.tf, README.md):
    1 - network module 
            -> contain some resource (VPC, Subent, Internet getway, Route table, Hosted zone)
            -> README.md inside this section explain in details each component.

    2 - server module 
            -> contain some resource (Secrutiy group, Instance, ElasticIP)
            ->
            -> README.md inside this section explain in details each component.

    3 - main.tf
            -> link the two modules.
    
    4 - providers.tf 
            -> specify which region we will setup our evnironment.

    5 - vairables.tf 
            -> declare of common varaibles used for both modules.
    


    6 - terraform.tfvars
            -> contain the value of the values.

    
    7 - entry-script.sh
            -> this scripts contain multiple commands for installing git, docker, and docker-compose.
            -> give permission for ec2-user, and finally run the jenkins container.

