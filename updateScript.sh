#!/bin/bash

# clean cache
sudo apt-get clean

# download updates list
sudo apt-get update

# smart version upgrade
sudo apt-get dist-upgrade -y

# next release
sudo do-release-upgrade

# remove deprecated package
sudo apt-get autoremove -y