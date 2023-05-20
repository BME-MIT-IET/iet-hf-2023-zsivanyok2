from selenium.webdriver.common.by import By

class SongsPageLocators(object):
    filter_button = (By.XPATH, "/html/body/app-root/app-songs/mat-card/mat-card-content[1]/button[1]")
    playlist_button = (By.XPATH, "/html/body/app-root/app-songs/mat-card/mat-card-content[1]/button[2]")

class FilterPageLocators(object):
    filter_out_button = (By.XPATH, "/html/body/app-root/app-filters/mat-card/mat-card-actions/button[1]")
    clear_button = (By.XPATH, "/html/body/app-root/app-filters/mat-card/mat-card-actions/button[2]")
    